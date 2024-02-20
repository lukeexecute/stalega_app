"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import {
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
} from "next-share";

type ShareButtonProps = {
  url: string;
  title: string;
};

// Define the component as a functional component with props typed according to ShareButtonProps
const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Image
            src="/assets/share.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Share with: </DrawerTitle>
            <DrawerDescription>
              <div className="flex items-center gap-2 px-7 py-5">
                <WhatsappShareButton url={url} title={title} separator=":: ">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <ViberShareButton url={url} title={title}>
                  <ViberIcon size={32} round />
                </ViberShareButton>
              </div>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ShareButton;
