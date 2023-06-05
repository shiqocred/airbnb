'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title, subtitle, value, onChange
}) => {
  const onAdd = useCallback(()=> {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(()=> {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">
          {title}
        </div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div 
          onClick={onReduce}
          className="
            flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 hover:opacity-80 transition cursor-pointer
        ">
          <AiOutlineMinus />
        </div>
        <div className="font-light text-lg text-neutral-600">
          {value}
        </div>
        <div 
          onClick={onAdd}
          className="
            flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 hover:opacity-80 transition cursor-pointer
        ">
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  )
}

export default Counter