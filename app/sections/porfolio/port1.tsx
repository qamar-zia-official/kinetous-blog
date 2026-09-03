"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import * as motion from "motion/react-client";
import { port1Data } from "./port1-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PortDetails from "./port-details";
import { ButtonGroup } from "@/components/ui/button-group";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, useInView } from "motion/react";
import SectionHeading2 from "../section-heading";

export default function Port1() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 0.6,
  });
  const [api1, setApi1] = useState<CarouselApi>();
  const [api1P, setApi1P] = useState<number>(1);
  return (
    <section
      ref={ref}
      className="flex items-center flex-col bg-zinc-950 gap-4 relative px-4"
      id="port1"
    >
      {inView && (
        <AnimatePresence>
          <motion.div className="bg-zinc-800/50 backdrop-blur-2xl backdrop-brightness-150 backdrop-saturate-150 rounded-full p-4 w-max flex gap-2 justify-center items-center fixed bottom-4 mx-auto mt-2 z-100 ">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                if (api1?.canScrollPrev()) {
                  api1?.scrollPrev();
                  setApi1P(api1.selectedScrollSnap() + 1);
                }
              }}
            >
              <ArrowLeft />
            </Button>
            <div className="h-2 rounded-full flex justify-center items-center gap-2">
              {port1Data.map((item, idx) => {
                return (
                  <motion.div
                    key={item.name}
                    className={cn(
                      "w-2 h-2 rounded-full bg-zinc-800",
                      api1P === idx + 1 && "bg-white",
                    )}
                  ></motion.div>
                );
              })}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                if (api1?.canScrollNext()) {
                  api1?.scrollNext();
                  setApi1P(api1.selectedScrollSnap() + 1);
                }
              }}
            >
              <ArrowRight />
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
      <div className="pb-16">
        <SectionHeading2>Systems You can Try right Now</SectionHeading2>
      </div>
      <Carousel
        setApi={setApi1}
        className="max-w-300 w-full h-full min-h-screen overflow-visible relative"
        opts={{
          watchDrag: false,
          align: "center",
        }}
      >
        <CarouselContent className="overflow-visible">
          {port1Data.map((item, index) => {
            return (
              <CarouselItem key={item.name}>
                <Card className="w-full h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-sans font-semibold">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-400 text-sm pb-6">
                      {item.description}
                    </CardDescription>
                    <div className="flex gap-2">
                      {item.techStack.map((item, idx) => {
                        return (
                          <div
                            key={idx}
                            className="flex gap-1 justify-center items-center bg-blue-600/70 border border-blue-600 py-1 px-2 rounded-full"
                          >
                            <item.icon />
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <PortDetails details={item.details} />
                    </div>
                    <Carousel className="w-[80%] h-[80%] mx-auto mb-auto">
                      <CarouselContent>
                        {item.images.map((image, index) => {
                          return (
                            <CarouselItem key={index}>
                              <div className="w-full h-full flex justify-center items-center">
                                <Image
                                  src={image}
                                  alt={item.name}
                                  width={200}
                                  height={200}
                                  className="rounded-3xl aspect-square w-full h-full object-cover shadow-2xs shadow-blue-200/30"
                                />
                              </div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                    </Carousel>
                  </CardContent>
                  <CardFooter>
                    <ButtonGroup>
                      <Button>
                        <Link href={item.link}>See Live</Link>
                      </Button>
                      <Button>
                        <Link href={item.caseLink}>Case Study</Link>
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
