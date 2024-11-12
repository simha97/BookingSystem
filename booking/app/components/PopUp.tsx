'use client';
import React from 'react';

export default function PopUp() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 text-center shadow-lg">
        <p className="text-xl font-bold mb-4">Ditt rum är bokat!</p>
        <span role="img" aria-label="smiley" className="text-4xl">
          😊
        </span>
      </div>
    </div>
  );
}
