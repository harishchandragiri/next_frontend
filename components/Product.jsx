import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Product = () => {
  return (
    <div className='px-1'>
              <div className='mb-7'>
                <div className='flex justify-between items-center'>
                  <h2 className='font-semibold text-3xl my-2 px-3'>Products</h2>
                </div>
                <hr className="my-1  border-gray-300" />
              </div>

      <div className='mb-3 flex flex-wrap justify-center md:justify-start'>

             <Card className="sm:mx-3 mx-1 my-3 w-[300px] h-[400px] rounded-2xl shadow-lg bg-amber-50 border border-amber-200">
              <CardHeader>
                <div className="w-full flex justify-center rounded-md bg-gradient-to-r from-yellow-100 to-amber-100 shadow-sm">
                  <img
                    src={
                      ""
                      // profile.image
                      //   ? `${API_URL}${profile.image.formats.large.url}`
                      //   : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-full h-40 object-cover border-1 rounded-md border-amber-200 shadow-md"
                  />
                </div>
              </CardHeader>
        
              <CardContent className="p-0">
                <CardFooter>
                  <CardTitle className="m-1 truncate w-full text-lg font-semibold text-gray-800">
                    Product Name svnvjkfkjsjfgbdgbfdghfgfjdgdsf
                  </CardTitle>
                </CardFooter>
        
                <CardFooter className="my-1 flex justify-between">
                  <CardTitle className="text-green-700 font-semibold m-1 truncate max-w-[140px]">
                    $129.99 hbajhghghghgghggjgjgjgjgj
                  </CardTitle>
                  <CardAction className="m-1 truncate max-w-[120px] text-gray-700 text-sm bg-white rounded-md p-1 shadow-sm">
                    Qty: 123456789
                  </CardAction>
                </CardFooter>
              </CardContent>
        
              <Button
                variant="outline"
                className="mx-5 mt-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg shadow-md rounded-xl transition-all duration-200"
              >
                🛒 Add to Cart
              </Button>
            </Card>

                         <Card className="sm:mx-3 mx-1 my-3 w-[300px] h-[400px] rounded-2xl shadow-lg bg-amber-50 border border-amber-200">
              <CardHeader>
                <div className="w-full flex justify-center rounded-md bg-gradient-to-r from-yellow-100 to-amber-100 shadow-sm">
                  <img
                    src={
                      ""
                      // profile.image
                      //   ? `${API_URL}${profile.image.formats.large.url}`
                      //   : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-full h-40 object-cover border-1 rounded-md border-amber-200 shadow-md"
                  />
                </div>
              </CardHeader>
        
              <CardContent className="p-0">
                <CardFooter>
                  <CardTitle className="m-1 truncate w-full text-lg font-semibold text-gray-800">
                    Product Name svnvjkfkjsjfgbdgbfdghfgfjdgdsf
                  </CardTitle>
                </CardFooter>
        
                <CardFooter className="my-1 flex justify-between">
                  <CardTitle className="text-green-700 font-semibold m-1 truncate max-w-[140px]">
                    $129.99 hbajhghghghgghggjgjgjgjgj
                  </CardTitle>
                  <CardAction className="m-1 truncate max-w-[120px] text-gray-700 text-sm bg-white rounded-md p-1 shadow-sm">
                    Qty: 123456789
                  </CardAction>
                </CardFooter>
              </CardContent>
        
              <Button
                variant="outline"
                className="mx-5 mt-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg shadow-md rounded-xl transition-all duration-200"
              >
                🛒 Add to Cart
              </Button>
            </Card>



      </div>
      
    </div>
  )
}

export default Product