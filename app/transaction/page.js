import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

const page = () => {
  return (
  <Card className="m-3 w-[300px] h-[370px] bg-gray-50">
  <CardHeader>
<div className="w-full flex justify-center rounded-md bg-amber-50">
       <img
          src={
            ''
            // profile.image
            //   ? `${API_URL}${profile.image.formats.large.url}`
            //   : "/default-avatar.png"
          }
          alt="Profile"
          className="w-full h-40 border-2 rounded-md border-gray-200 shadow-md"
        />
</div>
  </CardHeader>
  <CardContent className={'p-0'}>
      <CardFooter>
          <CardTitle className={'m-1 truncate w-full '}>Product Name svnvjkfkjsjfgbdgbfdghfgfjdgdsf</CardTitle>
      </CardFooter>
    <CardFooter className={'my-1 flex justify-between'}>
      <CardTitle className={'text-blue-700 m-1 truncate w-full'}>Price fwbfrbfjkrkjfkrfkrfrjfkrhrere </CardTitle>
      <CardAction className={'m-1 truncate w-[90px]'}>Quantity  jdnfjdfjdbsjfddnfs</CardAction>
    </CardFooter>
  </CardContent>

  <Button variant='outline' className="mx-5 bg-blue-400 text-xl">Add to cart</Button>
</Card>
  )
}

export default page