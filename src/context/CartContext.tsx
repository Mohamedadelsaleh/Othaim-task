// context/CartContext.tsx
import Notification from "@/components/Notification/Notification";
import { Product, syncCartWithAPI } from "@/services/services";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  needsSync: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "INCREASE_QUANTITY"; id: number }
  | { type: "DECREASE_QUANTITY"; id: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

const CART_STORAGE_KEY = "cart_items";

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
      showNotification: (
        message: string,
        type?: "success" | "error",
        icon?: string
      ) => void;
    }
  | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState = state;

  switch (action.type) {
    case "ADD_ITEM": {
      const item = state.items.find((item) => item.id === action.product.id);
      if (item) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.product, quantity: 1 }],
        };
      }
      break;
    }
    case "REMOVE_ITEM": {
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
      break;
    }
    case "INCREASE_QUANTITY": {
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
      break;
    }
    case "DECREASE_QUANTITY": {
      newState = {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
      break;
    }
    case "CLEAR_CART": {
      newState = {
        ...state,
        items: [],
        needsSync: true,
      };
      break;
    }
    case "LOAD_CART": {
      newState = {
        ...state,
        items: action.items,
      };
      break;
    }
    default:
      return state;
  }

  // Save to localStorage after every action
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState.items));
  return { ...newState, needsSync: true };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    needsSync: false,
  });
  const [notification, setNotification] = useState<{
    message: string;
    icon?: string;
    type?: "success" | "error";
  } | null>(null);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      dispatch({ type: "LOAD_CART", items: JSON.parse(savedCart) });
    }
  }, []);

  const syncCart = async () => {
    if (state.needsSync && navigator.onLine) {
      try {
        await syncCartWithAPI(state.items);
        dispatch({ type: "CLEAR_CART" });
      } catch (error) {
        showNotification("Failed to sync cart. Will retry later.", "error");
      }
    }
  };

  useEffect(() => {
    const handleOnline = () => syncCart();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [state.needsSync]);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success",
    icon?: string
  ) => {
    setNotification({ message, type, icon });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <CartContext.Provider value={{ state, dispatch, showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          visible={true}
          type={notification.type}
          icon={notification.icon}
        />
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
