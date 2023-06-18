import { FixedTypes, formSchema } from "../App"

import * as z from 'zod'

interface UpdateOutput {
    values:z.infer<typeof formSchema>
    output: FixedTypes,
    setOutput: React.Dispatch<React.SetStateAction<FixedTypes>>
}

const updateOutput = (fn : UpdateOutput)     => {
    // changing dependent fields
    const roadWidth = fn.values.roadWidth
    const areaUnit = fn.values.areaUnit
    const landRate = fn.values.landRate
    const landArea = fn.values.landArea


    const updatedRatePerSqft = +(landRate / areaUnit).toFixed(1);
    const updatedRoadFactors = Number(((roadWidth * 1.25) / 20).toFixed(2));
    const builtupPerDecimal = +(areaUnit * updatedRoadFactors).toFixed(2);
    const landAreaPerSqft = +(areaUnit * landArea).toFixed(2);
    const builtUpArea = +(areaUnit * updatedRoadFactors * landArea).toFixed(2);
    const landPrice1Year = +(landRate * landArea).toFixed(2);
    const landPrice2Year = +(landRate * landArea*1.15).toFixed(2);
    const landPrice3Year = +(landRate * landArea*1.35).toFixed(2);
    const landPrice4Year = +(landRate * landArea*1.6).toFixed(2);
    const constCost = +(builtUpArea*1600).toFixed(2);
    const otherCost = +(builtUpArea*200).toFixed(2);
    const totalConstPrice1Year = +(constCost+otherCost).toFixed(2)
    const totalConstPrice2Year = Math.floor(totalConstPrice1Year*1.1)
    const totalConstPrice3Year = Math.floor(totalConstPrice1Year*1.2)
    const totalConstPrice4Year = Math.floor(totalConstPrice1Year*1.3)
    // + infront parses string to number 
    const totalAmount1Year = landPrice1Year + totalConstPrice1Year
    const totalAmount2Year = landPrice2Year + totalConstPrice2Year
    const totalAmount3Year = landPrice3Year + totalConstPrice3Year
    const totalAmount4Year = landPrice4Year + totalConstPrice4Year
    const landOwnerRatio1Year = +((landPrice1Year*100)/totalAmount1Year).toFixed(2)
    const landOwnerRatio2Year = +((landPrice2Year*100)/totalAmount2Year).toFixed(2)
    const landOwnerRatio3Year = +((landPrice3Year*100)/totalAmount3Year).toFixed(2)
    const landOwnerRatio4Year = +((landPrice4Year*100)/totalAmount4Year).toFixed(2)


    fn.setOutput(prev => {
        return [
            { name: 'Rate/SQFT', value: updatedRatePerSqft},
            { name: 'Road Factors', value: updatedRoadFactors},
            { name: 'Built Up/Decimal', value: builtupPerDecimal},
            { name: 'Land Area/SQFT', value: landAreaPerSqft },
            { name: 'Built Up Area', value: builtUpArea},
            { name: 'Land Price 1 Year', value: landPrice1Year },
            { name: 'Land Price 2 Year', value: landPrice2Year },
            { name: 'Land Price 3 Year', value: landPrice3Year },
            { name: 'Land Price 4 Year', value: landPrice4Year },
            { name: 'Construction Cost', value: constCost },
            { name: 'Other Cost', value: otherCost },
            { name: 'Total Const. Price 1 Year', value: totalConstPrice1Year },
            { name: 'Total Const. Price 2 Year', value: totalConstPrice2Year },
            { name: 'Total Const. Price 3 Year', value: totalConstPrice3Year },
            { name: 'Total Const. Price 4 Year', value: totalConstPrice4Year },
            { name: 'Total Amount 1 Year', value: totalAmount1Year },
            { name: 'Total Amount 2 Year', value: totalAmount2Year },
            { name: 'Total Amount 3 Year', value: totalAmount3Year },
            { name: 'Total Amount 4 Year', value: totalAmount4Year },
            { name: 'Land Owner Ratio 1 Year', value: landOwnerRatio1Year },
            { name: 'Land Owner Ratio 2 Year', value: landOwnerRatio2Year },
            { name: 'Land Owner Ratio 3 Year', value: landOwnerRatio3Year },
            { name: 'Land Owner Ratio 4 Year', value: landOwnerRatio4Year },

        ]
    })

    // setValues((prev) => ({
    //   ...prev,
    //   ratePerSQFT: updatedRatePerSqft,
    //   roadFactors: updatedRoadFactors,
    //   builtUpPerDecimal: builtupPerDecimal,
    //   landAreaSQFT: landAreaPerSqft,
    //   builtUpArea: builtUpArea,
    //   landPrice1Year: landPrice1Year,
    //   landPrice2Year: landPrice2Year,
    //   landPrice3Year: landPrice3Year,
    //   landPrice4Year: landPrice4Year,
    //   constructionCost: constCost,
    //   otherCost: otherCost,
    //   totalConsPrice1year: totalConstPrice1Year,
    //   totalConsPrice2year: totalConstPrice2Year,
    //   totalConstPrice3Year: totalConstPrice3Year,
    //   totalConstPrice4Year: totalConstPrice4Year,
    //   totalAmount1Year: totalAmount1Year,
    //   totalAmount2Year: totalAmount2Year,
    //   totalAmount3Year: totalAmount3Year,
    //   totalAmount4Year: totalAmount4Year,
    //   landOwnerRatio1Year: landOwnerRatio1Year,
    //   landOwnerRatio2Year: landOwnerRatio2Year,
    //   landOwnerRatio3Year: landOwnerRatio3Year,
    //   landOwnerRatio4Year: landOwnerRatio4Year,
    // }));
}

export default updateOutput;