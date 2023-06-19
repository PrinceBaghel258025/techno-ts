import React from 'react';
import {FixedTypes} from '@/src/App';

export interface Props {
  data: FixedTypes;
}


function OutPutFields({data}: Props) {
    
    const initialFields = data.slice(1,5);

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {initialFields.map((obj) => {
        return (
          <div className=" flex justify-between px-4 py-2 text-left" key={obj.name}>
            <p>{obj.name}</p>
            <p>{obj.value}</p>
          </div>
        );
      })}
      {data.slice(5, -4).map((obj) => {
        return (
          <div className=" flex justify-between px-4 py-2 text-left" key={obj.name}>
            <p>{obj.name}</p>
            <p>{obj.value.toLocaleString('en-In', {currency: 'INR', style: 'currency'})}</p>
          </div>
        );
      })}
      {data.slice(-4).map((obj) => {
        return (
          <div className=" flex justify-between px-4 py-2 text-left" key={obj.name}>
            <p>{obj.name}</p>
            <p>{obj.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default OutPutFields;
