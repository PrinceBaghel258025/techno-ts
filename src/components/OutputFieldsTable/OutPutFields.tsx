import React from 'react';
import {FixedTypes} from '@/src/App';
import {filterData} from '../../utils/helper'
export interface Props {
  data: FixedTypes;
  paymentSpan: number[]
}


function OutPutFields({data, paymentSpan}: Props) {
    console.log("data", data)
    const initialFields = data.slice(0,5);

    const filteredOnPaymentSpan = filterData(data, paymentSpan)

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
      {
        data.filter(obj => obj.name.includes('Cost')).map((obj) => {
            return (
                <div className=" flex justify-between px-4 py-2 text-left" key={obj.name}>
                  <p>{obj.name}</p>
                  <p>{obj.value.toLocaleString('en-In', {currency: 'INR', style: 'currency'})}</p>
                </div>
              ); 
        })
      }
      {filteredOnPaymentSpan.filter(obj => !obj.name.includes('Ratio')).map((obj) => {
        return (
          <div className=" flex justify-between px-4 py-2 text-left" key={obj.name}>
            <p>{obj.name}</p>
            <p>{obj.value.toLocaleString('en-In', {currency: 'INR', style: 'currency'})}</p>
          </div>
        );
      })}
      {filteredOnPaymentSpan.filter(obj => obj.name.includes('Ratio')).map((obj) => {
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
