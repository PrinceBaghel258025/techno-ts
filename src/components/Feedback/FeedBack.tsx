import React, {useState} from 'react';
import {FaRegThumbsUp, FaThumbsUp} from 'react-icons/fa';
import {FaRegThumbsDown, FaThumbsDown} from 'react-icons/fa';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {FixedTypes} from '../../App';

const feedbackFormSchema = z.object({
  Name: z.string(),
  Number: z.string(),
  dealType: z.string(),
});
type Props = {
  inputValues: any;
  outputValues: FixedTypes;
};
const FeedBack = ({inputValues, outputValues}: Props) => {
  const dealNone =
    'Need to pay some amount at the start of the deal that is non-refundable';
  const dealAdjustable =
    'Some amount needs to pay and some amount needs to adjust from houses. This is basically for security purposes';

  const [like, setLike] = useState<null | boolean>(null);

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
  });

  const onFeedBackSubmit = async (
    values: z.infer<typeof feedbackFormSchema>
  ) => {
    const likeStatus = like;
    console.log(likeStatus);
    console.log(values);
    const dataToBePosted = {
      like: likeStatus,
      contactInfo: values,
      inputValues,
      outputValues,
    };
    console.log(JSON.parse(JSON.stringify(dataToBePosted)));
    fetch(
      `https://warm-pipefish-30163.upstash.io/set/${
        values.Name
      }/${JSON.stringify(dataToBePosted)}`,
      {
        headers: {
          Authorization:
            'Bearer AXXTACQgYjljYzBhN2EtYzA2Ny00ODgyLTk3M2ItMmQ0ZTUzYzYwNTNmNTZjYWRkMDViZTA2NDVkYzlhOWJmNGVkMjFhZjc5Yjg=',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="my-4">
      {/* <div className="flex gap-6 px-4 py-2">
        <div
          onClick={() => setLike(true)}
        >
          {like ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </div>
        <div onClick={() => setLike(false)}>
          {like ?<FaRegThumbsDown />  : <FaThumbsDown />}
        </div>
      </div> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFeedBackSubmit)}
          className=" grid grid-cols-1 sm:grid-cols-2 px-4  gap-4"
        >
          <FormField
            control={form.control}
            name="Name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Number"
            render={({field}) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dealType"
            render={({field}) => (
              <FormItem>
                <FormLabel>Deal Type</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Deal Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="adjustable">Adjustable</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>{field.value === 'none' ? dealNone : field.value === 'adjustable' ? dealAdjustable : ''}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <div>
            <Button
              onClick={() => setLike(true)}
              className={`${like === true ? 'bg-green-600' : ''}`}
              type="submit"
            >
              Good Deal&nbsp;&nbsp; <FaRegThumbsUp />
            </Button>
            <Button
              onClick={() => setLike(false)}
              className={`mx-4 ${like === false ? 'bg-red-600' : ''}`}
              type="submit"
            >
              Bad Deal &nbsp;&nbsp;
              <FaRegThumbsDown />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FeedBack;
