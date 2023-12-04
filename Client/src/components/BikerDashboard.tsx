"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Parcel,
  assignParcelToBiker,
  deliverParcel,
  getParcelsForBikers,
  selectparcels,
} from "../redux/features/parcel-slice";
import { AppDispatch } from "../redux/store";

export default function BikerDashboard() {
  const parcels = useSelector(selectparcels, shallowEqual);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getParcelsForBikers());
  }, [dispatch]);

  const setStatus = (item: Parcel) => {
    if (item.status === "waiting") {
      dispatch(assignParcelToBiker({ parcelId: item._id || item.id }));
    }

    if (item.status === "picked") {
      dispatch(deliverParcel({ parcelId: item._id || item.id }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "danger";
      case "picked":
        return "warning";
      case "delivered":
        return "success";
      default:
        return "danger";
    }
  };

  return (
    <div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {parcels?.map((item, index) => (
          <Card shadow="sm" className="" key={index}>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600 trun">
                    Pickup: {item.pickupAddress}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400 trun">
                    DropOff: {item.dropoffAddress}
                  </h5>
                </div>
              </div>
              <Button
                className={
                  item.status === "waiting"
                    ? "bg-transparent text-primary border-default-200"
                    : item.status === "picked"
                    ? "bg-transparent text-danger border-default-200"
                    : "hidden"
                }
                color="primary"
                radius="full"
                size="sm"
                variant={"bordered"}
                onPress={() => setStatus(item)}
              >
                {item.status === "waiting"
                  ? "Assign"
                  : item.status === "picked"
                  ? "Deliver"
                  : null}
              </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>
                Pick-Time: 
              </p>
              <p>{item.pickupTimestamp}</p>
              <p>
              Dropoff:Time: 
              </p>
              <p>{item.deliveryTimestamp}</p>
              
            </CardBody>
            <CardFooter className="gap-3">
              <p className=" text-default-400 text-small">
                <Chip
                  color={getStatusColor(item.status as string)}
                  radius="full"
                >
                  {item.status}
                </Chip>
              </p>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
