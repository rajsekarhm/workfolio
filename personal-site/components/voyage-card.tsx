"use client";

import { Memory, memory } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export interface VoyageCardProps {
  memory: Memory;
}
import Image from "next/image";



// eslint-disable-next-line   @typescript-eslint/no-require-imports


function CarouselDemo({ content }: { content: memory[] }) {
  return (
    <Carousel className="w-full max-w-screen w-96 h-96">
      <CarouselContent>
        {content.map((image, index) => {
          return (
            <CarouselItem key={index}>
              <div className="p-8">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-8">
                    {image.mediaType == "image" ? (
                       <Image
                       height={1200}
                       width={300}
                         src={require(`../content/${image.mediaUrl}`)}
                         alt={image.title}
                         className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                         />
                    ) : (
                      <video
                        src={image.mediaUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export async function VoyageCard({ memory }: VoyageCardProps) {
  return (
    <Drawer>
      <Card className="w-full max-w-3xl hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{memory.title}</CardTitle>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {format(new Date(memory.date), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{memory.location}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <DrawerTrigger asChild>
            <AspectRatio ratio={12 / 5} className="overflow-hidden rounded-md">
              {memory.mediaType === "image" ? (
                <div key={memory.id} className="flex justify-center items-center h-auto py-4" >
                  <Image
                  height={1200}
                  width={300}
                  src={require(`../content/${memory.mediaUrl}`)}
                  alt={memory.title}
                  className="w-full h-full object-cover  hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <video
                  src={memory.mediaUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              )}
            </AspectRatio>
          </DrawerTrigger>
          <ScrollArea className="h-24">
            <p className="text-muted-foreground leading-relaxed">
              {memory.description}
            </p>
          </ScrollArea>
        </CardContent>
        <DrawerContent className="flex items-center max-w-screen">
          <DrawerHeader>
            <CarouselDemo content={memory.memories} />
          </DrawerHeader>
        </DrawerContent>
      </Card>
    </Drawer>
  );
}
