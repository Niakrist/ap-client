"use client";
import { Button } from "@/components/ui/Button/Button";
import styles from "./page.module.css";
import { Field } from "@/components/ui/Field/Field";
import { Heading } from "@/components/ui/Heading/Heading";
import { Badge } from "@/components/ui/Badge/Badge";
import { Loader } from "@/components/ui/Loader/Loader";
import { ShowMore } from "@/components/ui/ShowMore/ShowMore";

export default function Home() {
  const onLoader = () => {
    console.log("+++");
  };
  return (
    <main className={styles.main}>
      <Heading>Hello!</Heading>
      <Badge color="blue" value={10} maxValue={20} />
      <Badge color="red" value={10} maxValue={20} />
      <Field label="Name" placeholder="Enter your name" />
      <Button variant="prmary">Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="disabled">Click me</Button>
      <Button isCircle variant="prmary">
        1
      </Button>
      <Loader />
      <ShowMore onLoader={() => {}} isLoading={false} />
    </main>
  );
}
