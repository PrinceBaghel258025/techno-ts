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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../src/components/ui/select';
import {Input} from './components/ui/input';
import OutPutFields from './components/OutputFieldsTable/OutPutFields';
import {convertToLakh, updateOutput} from './utils/helper';
import {Slider} from './components/ui/slider';
import Feedback from './components/Feedback/FeedBack';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from '@clerk/clerk-react';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export const formSchema = z.object({
  city: z.string(),
  roadWidth: z.string(),
  areaUnit: z.coerce.number().min(435.5, {
    message: 'Are Unit must be at least 435.5 .',
  }),
  landRate: z.coerce.number().min(100000, {
    message: 'Land Rate must be at least 100000.',
  }),
  landArea: z.coerce.number().min(30, {
    message: 'Land Area must be at least 30.',
  }),
  paymentSpan: z.string(),
});

export interface FixedTypes extends Array<BaseInputTypes> {}

export interface BaseInputTypes {
  name: string;
  value: number;
}

const initialOutputValues = [
  {name: 'Rate (Sq. Ft.)', value: 229.6},
  {name: 'Road Factors', value: 1.25},
  {name: 'Built Up (Dec. )', value: 544},
  {name: 'Land Area (Sq. Ft.)', value: 43550},
  {name: 'Built Up Area', value: 54437.5},
  {name: 'Construction Cost', value: 87100000},
  {name: 'Other Cost', value: 10887500},
  {name: 'Land Cost 1 Year', value: 10000000},
  {name: 'Land Cost 2 Year', value: 11500000},
  {name: 'Land Cost 3 Year', value: 13500000},
  {name: 'Land Cost 4 Year', value: 16000000},
  {name: 'Total Construction Cost 1 Year', value: 97987500},
  {name: 'Total Construction Cost 2 Year', value: 107786250},
  {name: 'Total Construction Cost 3 Year', value: 117585000},
  {name: 'Total Construction Cost 4 Year', value: 127383750},
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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
      roadWidth: '20',
      areaUnit: 435.5,
      landRate: 100000,
      landArea: 30,
      paymentSpan: '1',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    updateOutput({values, output, setOutput});
    // console.log(values);
  }

  //   const handleChange = () => {
  //         const values = form.watch();
  //         console.log('value', values);
  //     };

  const handleReset = () => {
    form.reset();
    const values: z.infer<typeof formSchema> = form.getValues();
    console.log(values);
    updateOutput({values, output, setOutput});
  };

  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        <SignedIn>
          <div className='mt-4 mr-4 flex justify-end'>
            <UserButton />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" grid grid-cols-1 sm:grid-cols-2 px-4 gap-4 "
            >
              <FormField
                control={form.control}
                name="city"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>City ( Optional )</FormLabel>
                    <FormControl onChange={form.handleSubmit(onSubmit)}>
                      <Input type="text" placeholder="City Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roadWidth"
                render={({field}) => (
                  <FormItem onChange={form.handleSubmit(onSubmit)}>
                    <FormLabel>Road Width (Sq. Ft.)</FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Road Width" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="areaUnit"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Area (Sq. Ft.)</FormLabel>
                    {/* <FormControl onChange={(e) => {handleChange(e) }}> */}
                    <FormControl onChange={form.handleSubmit(onSubmit)}>
                      <Input
                        type="number"
                        placeholder="Area Unit (Sq. Ft.)"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Land Rate (INR)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {convertToLakh(field.value)}
                    </FormDescription>
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
                      <Input
                        type="number"
                        placeholder="Land Area (Dec.)y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentSpan"
                render={({field}) => (
                  <FormItem onChange={form.handleSubmit(onSubmit)}>
                    <FormLabel>Payment Span (Years )</FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Payment Span" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={() => handleReset()}
                className="sm:mx-16 sm:col-span-2"
                type="reset"
              >
                RESET
              </Button>
            </form>
          </Form>
          <OutPutFields data={output} paymentSpan={+form.watch().paymentSpan} />
          <Feedback inputValues={form.getValues()} outputValues={output} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </>
  );
}

export default App;
