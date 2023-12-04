import { Slider } from "@nextui-org/react";

export default function SliderComp() {
  return (
    <div className="parent opacity-change">
      <Slider
        step={0.5}
        color="success"
        isDisabled
        formatOptions={{ style: "percent" }}
        maxValue={1}
        minValue={0}
        marks={[
          {
            value: 0,
            label: "Waiting",
          },
          {
            value: 0.5,
            label: "Picked",
          },
          {
            value: 1,
            label: "Delivered",
          },
        ]}
        defaultValue={0}
        className="max-w-md child-to-change-opacity"
      />
    </div>
  );
}
