import React from 'react';
import {FixedTypes} from '@/src/App';
import {convertToLakh, filterData, intoCommas} from '../../utils/helper';
export interface Props {
  data: FixedTypes;
  paymentSpan: number;
}

function OutPutFields({data, paymentSpan}: Props) {
  const initialFields = [...data.slice(0, 1), ...data.slice(2, 7)];

  const filteredOnPaymentSpan = data.filter((obj) =>
    obj.name.includes(String(paymentSpan))
  );

  return (
    // <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
    <div className=" flex flex-col md:flex-row  md:gap-8 ">
      <div className='flex flex-col md:w-4/12'>
        {initialFields.slice(0, 4).map((obj) => {
          return (
            <div
              className=" flex justify-between px-4 py-2 text-left"
              key={obj.name}
            >
              <p>{obj.name}</p>
              <p>{intoCommas(obj.value)}</p>
            </div>
          );
        })}
        {initialFields
          .filter((obj) => obj.name.includes('Cost'))
          .map((obj) => {
            return (
              <div
                className=" flex justify-between px-4 py-2 text-left"
                key={obj.name}
              >
                <p>{obj.name}</p>
                <p>{convertToLakh(obj.value)}</p>
              </div>
            );
          })}
      </div>
        {/* Land Owner Ratio */}
      <div className='flex flex-col  md:w-4/12'>
        {filteredOnPaymentSpan
          .filter((obj) => obj.name.includes('Ratio'))
          .map((obj) => {
            return (
              <div
                className=" flex justify-between px-4 py-2 text-left"
                key={obj.name}
              >
                <p>{obj.name.split(" ").reverse().slice(2).reverse().join(" ")}</p>
                <p>{obj.value} %</p>
              </div>
            );
          })}
      </div>
        {/* Year Based Cost  */}
      <div className='flex flex-col md:w-4/12'>
        {filteredOnPaymentSpan
          .filter((obj) => !obj.name.includes('Ratio'))
          .map((obj) => {
            return (
              <div
                className=" flex justify-between px-4 py-2 text-left"
                key={obj.name}
              >
                <p>{obj.name.split(" ").reverse().slice(2).reverse().join(" ")}</p>
                <p>{convertToLakh(obj.value)}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default OutPutFields;
