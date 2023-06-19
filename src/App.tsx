import React, {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {Button} from './components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import {Input} from './components/ui/input';
import OutPutFields from './components/OutputFieldsTable/OutPutFields';
import {updateOutput} from './utils/helper';
import {Slider} from './components/ui/slider';

export const formSchema = z.object({
  roadWidth: z.coerce
    .number()
    .min(20, {
      message: 'Road Width must be at least 20.',
    }),
  areaUnit: z.coerce.number().min(435.5, {
    message: 'Are Unit must be at least 435.5 .',
  }),
  landRate: z.coerce.number().min(100000, {
    message: 'Land Rate must be at least 100000.',
  }),
  landArea: z.coerce.number().min(100, {
    message: 'Land Area must be at least 100.',
  }),
  paymentSpan: z.coerce.number().min(1, {
    message: 'Payment span must be at least 1'
  })
});

export interface FixedTypes extends Array<BaseInputTypes> {}

export interface BaseInputTypes {
  name: string;
  value: number;
}

const initialOutputValues = [
  {name: 'Rate/SQFT', value: 229.6},
  {name: 'Road Factors', value: 1.25},
  {name: 'Built Up/Decimal', value: 544},
  {name: 'Land Area/SQFT', value: 43550},
  {name: 'Built Up Area', value: 54437.5},
  {name: 'Land Price 1 Year', value: 10000000},
  {name: 'Land Price 2 Year', value: 11500000},
  {name: 'Land Price 3 Year', value: 13500000},
  {name: 'Land Price 4 Year', value: 16000000},
  {name: 'Construction Cost', value: 87100000},
  {name: 'Other Cost', value: 10887500},
  {name: 'Total Const. Price 1 Year', value: 97987500},
  {name: 'Total Const. Price 2 Year', value: 107786250},
  {name: 'Total Const. Price 3 Year', value: 117585000},
  {name: 'Total Const. Price 4 Year', value: 127383750},
  {name: 'Total Amount 1 Year', value: 107987500},
  {name: 'Total Amount 2 Year', value: 119286250},
  {name: 'Total Amount 3 Year', value: 131085000},
  {name: 'Total Amount 4 Year', value: 143383750},
  {name: 'Land Owner Ratio 1 Year', value: 9.26},
  {name: 'Land Owner Ratio 2 Year', value: 9.64},
  {name: 'Land Owner Ratio 3 Year', value: 10.3},
  {name: 'Land Owner Ratio 4 Year', value: 11.16},
];

function App() {
  const [output, setOutput] = useState<FixedTypes>(initialOutputValues);
  const [paymentSpan, setPaymentSpan] = useState<Array<number>>([1])
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roadWidth: 20,
      areaUnit: 435.5,
      landRate: 100000,
      landArea: 100,
      paymentSpan: 1,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    updateOutput({values, output, setOutput});
    console.log(values);
  }

  // const handleChange = (e: React.FormEvent<HTMLElement>) => {
  //       console.log('value2', values2);
  //       const values = form.watch();
  //       console.log('value', values);
  //   };

  const handlePaymentSpan = (value :number[]) => {
    console.log(value)
    setPaymentSpan(value)
  }
  const handleReset = () => {
    form.reset();
    handlePaymentSpan([1]);
    const values: z.infer<typeof formSchema> = form.getValues();
    updateOutput({values, output, setOutput});
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-cols-1 sm:grid-cols-2 px-4 gap-4 "
        >
          <FormField
            control={form.control}
            name="roadWidth"
            render={({field}) => (
              <FormItem>
                <FormLabel>Road Width (Ft.) </FormLabel>
                {/* <FormControl  onChange={(e) => {handleChange(e) }}> */}
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input type="number" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaUnit"
            render={({field}) => (
              <FormItem>
                <FormLabel>Area Unit (Sq. Ft.)</FormLabel>
                {/* <FormControl onChange={(e) => {handleChange(e) }}> */}
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input type="number" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="landRate"
            render={({field}) => (
              <FormItem>
                <FormLabel>Land Rate (INR)</FormLabel>
                {/* <FormControl onChange={(e) => {handleChange(e) }}> */}
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input type="number" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="landArea"
            render={({field}) => (
              <FormItem>
                <FormLabel>Land Area (Dec.)</FormLabel>
                {/* <FormControl onChange={(e) => {handleChange(e) }}> */}
                <FormControl onChange={form.handleSubmit(onSubmit)}>
                  <Input type="number" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="paymentSpan"
            render={({field}) => {
                <FormItem>
                    <FormLabel>Land Area (Dec.)</FormLabel>
                    <FormControl>
                    </FormControl>
                    </FormItem>
                }}
                
            /> */}
            <div>
            <div>Payment Span</div>
            <Slider value={paymentSpan} onValueChange={(value) => handlePaymentSpan(value)} min={0} max={4} step={1} />
            </div>
          <Button
            onClick={() => handleReset()}
            className="sm:mx-16 sm:col-span-2"
            type="reset"
          >
            RESET
          </Button>
        </form>
      </Form>
      <OutPutFields data={output} paymentSpan={paymentSpan} />
    </>
  );
}

export default App;
