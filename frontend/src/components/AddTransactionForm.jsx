"use client";

import React, { useActionState, useState } from "react";
import SubmitButton from "./SubmitButton";
import { TiTimes, TiPlus } from "react-icons/ti";
import { createTransaction } from "@/actions/transaction-actions";

const CATEGORIES = [
  { value: "GR", label: "Groceries", color: "rgba(52,211,153,0.9)" },
  { value: "CS", label: "Cleaning Supplies", color: "rgba(99,102,241,0.9)" },
  { value: "HE", label: "Home Essentials", color: "rgba(251,191,36,0.9)" },
];

const emptyItem = () => ({ category: "GR", name: "", price: "", units: 1 });

const AddTransactionForm = () => {
  const [items, setItems] = useState([emptyItem()]);

  const updateItem = (index, field, value) =>
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const total = items.reduce(
    (sum, item) =>
      sum + (parseFloat(item.price) || 0) * (parseInt(item.units) || 0),
    0,
  );

  const [state, formAction, isPending] = useActionState(createTransaction, {
    error: null,
  });

  return (
    <form
      action={formAction}
      id="transaction-form"
      className="relative card font-poppins flex flex-col overflow-hidden h-[90%] xl:h-[80%]"
    >
      {/* Hidden inputs */}
      {items.map((item, index) => (
        <div key={index} className="hidden">
          <input
            type="hidden"
            name={`items[${index}][category]`}
            value={item.category}
          />
          <input
            type="hidden"
            name={`items[${index}][name]`}
            value={item.name}
          />
          <input
            type="hidden"
            name={`items[${index}][price]`}
            value={item.price}
          />
          <input
            type="hidden"
            name={`items[${index}][units]`}
            value={item.units}
          />
        </div>
      ))}

      {/* Header */}
      <div className="shrink-0 px-6 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-textPrimary/30">
            New
          </p>
          <h2 className="text-lg xl:text-xl font-semibold text-textPrimary/90 mt-0.5">
            Add Transaction
          </h2>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                     bg-white/6 border border-outline text-textPrimary/60
                     hover:bg-white/10 hover:text-textPrimary/80 transition-all duration-150 active:scale-95"
        >
          <TiPlus className="text-sm md:text-lg" />
          Add Item
        </button>
      </div>

      {/* Column headers — hidden on mobile */}
      <div className="shrink-0 px-6 pb-2 hidden md:block">
        <div
          className="grid gap-2 text-sm uppercase tracking-wider text-textPrimary/25 px-1"
          style={{ gridTemplateColumns: "1fr 2fr 80px 60px 28px" }}
        >
          <span>Category</span>
          <span>Name</span>
          <span>Price</span>
          <span>Units</span>
          <span />
        </div>
      </div>

      <div className="shrink-0 mx-6 h-px bg-outline/50" />

      {/* Scrollable items */}
      <div
        className="flex-1 overflow-y-auto px-6 py-3 flex flex-col gap-2 min-h-0"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, index) => {
          const cat = CATEGORIES.find((c) => c.value === item.category);
          return (
            <div
              key={index}
              className="relative flex flex-col gap-2 p-3 bg-white/5 border-outline md:h-14 rounded-xl border group transition-colors duration-150
                         md:grid md:items-center md:p-2"
              style={{
                gridTemplateColumns: "1fr 2fr 80px 60px 28px",
              }}
            >
              {/* Category */}
              <select
                value={item.category}
                onChange={(e) => updateItem(index, "category", e.target.value)}
                className="w-full bg-transparent text-xs font-medium rounded-lg px-2 py-1.5
                           border border-outline/60 focus:outline-none focus:border-white/20
                           transition-colors duration-150 cursor-pointer appearance-none"
                style={{ color: cat?.color }}
              >
                {CATEGORIES.map((c) => (
                  <option
                    key={c.value}
                    value={c.value}
                    className="bg-foreground text-white"
                  >
                    {c.label}
                  </option>
                ))}
              </select>

              {/* Name */}
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
                placeholder="Item name"
                className="w-full bg-transparent text-xs text-textPrimary/80 px-2 py-1.5
                           border border-outline/60 rounded-lg placeholder-textPrimary/30
                           focus:outline-none focus:border-white/20 transition-colors duration-150"
              />

              {/* Price + Units — side by side on mobile, separate cells on md+ */}
              <div className="grid grid-cols-2 gap-2 md:contents">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full bg-transparent text-xs text-textPrimary/80 px-2 py-1.5
                             border border-outline/60 rounded-lg placeholder-textPrimary/30
                             focus:outline-none focus:border-white/20 transition-colors duration-150"
                />
                <input
                  type="number"
                  value={item.units}
                  onChange={(e) => updateItem(index, "units", e.target.value)}
                  min="1"
                  className="w-full bg-transparent text-xs text-textPrimary/80 px-2 py-1.5
                             border border-outline/60 rounded-lg placeholder-textPrimary/30
                             focus:outline-none focus:border-white/20 transition-colors duration-150"
                />
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
                className="flex items-center cursor-pointer justify-center w-full h-7 rounded-lg
                          text-red-400 bg-red-400/10 xl:bg-transparent xl:text-textPrimary/30 xl:hover:text-red-400 xl:hover:bg-red-400/10
                           border border-outline/30 md:w-6 md:h-6 md:border-none
                           transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <TiTimes className="text-lg" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer — always visible */}
      <div className="shrink-0">
        <div className="mx-6 h-px bg-outline/50" />
        <div className="px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase tracking-wider text-textPrimary/30">
              Total
            </span>
            <span className="text-sm font-semibold text-textPrimary/80">
              £{total.toFixed(2)}
            </span>
          </div>
          <SubmitButton isPending={isPending} text="Submit Transaction" />
        </div>
      </div>
    </form>
  );
};

export default AddTransactionForm;
