import './globals.css'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "../app/src/Context/CartContext";
import { WishlistProvider } from "../app/src/Context/WishlistContext";
import { UserProvider } from "../app/src/Context/UserContext";
import { BundleProvider } from '../app/src/Context/BundleContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "../app/src/components/Header/Header";
import Footer from "../app/src/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Disposable Bazaar",
  description: "Quality disposable products",
  other: {
    link: [
      "https://ecommerce-inventory.thegallerygen.com/public/Frontend/Assets/HomeAssets/HeroSecton/Banner1.png"
    ]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId='341574951595-7kmbo799rdp05d4dcjgn0vfkpfsrrs44.apps.googleusercontent.com'>
          <UserProvider>
            <CartProvider>
              <BundleProvider>
                <WishlistProvider>
                  <Header />
                  
                  {children} 

                  <Footer />
                </WishlistProvider>
              </BundleProvider>
            </CartProvider>
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
