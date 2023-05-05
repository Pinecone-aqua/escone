import React from 'react'


function test() {
  return (
    <div
            className="flex justify-between w-9/12  bg-orange-300 p-5"
          >
            <div className=" h-full ">
              <picture className="h-full">
                <img src="" alt="" className="h-full " />
              </picture>
            </div>
            <div className="">
              <p>title</p>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-green-300 rounded-full"
               
              >
                approve
              </button>

              <button
               
                className="px-4 py-2 bg-red-500 rounded-full"
              >
                denied
              </button>
            </div>
          </div> 
  )
}

export default test