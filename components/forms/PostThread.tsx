"use client";

import React, { useState } from "react"; // Step 1
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();
  const [characterCount, setCharacterCount] = useState(0); // Step 2

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Statement Text
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={3}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // Call the form's onChange
                    setCharacterCount(e.target.value.length); // Step 3: Update character count
                  }}
                />
              </FormControl>
              <FormMessage />
              <div
                className="text-right text-small-semibold text-light-2"
                style={{ color: characterCount > 140 ? "red" : "white" }} // Conditional color change
              >
                {characterCount} / 140
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Statement
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
