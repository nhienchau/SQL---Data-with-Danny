import React from "react";

function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <p className="text-muted-foreground">© {new Date().getFullYear()} Nhien Chau. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 