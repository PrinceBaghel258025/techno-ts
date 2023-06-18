import React from 'react';
import {FixedTypes} from '@/src/App';

export interface Props {
  data: FixedTypes;
}


function OutPutFields({data}: Props) {
    
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
      {data.map((obj) => {
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
