"use client"

import { useParams } from "next/navigation";

export default function ExampleClientComponent() {
  const params = useParams();

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)

  return (
    <div className="pt-20">
      <h1>Example Client Component</h1>
      <p>Check the console to see the route parameters.</p>
      <p>Current concert ID: {params.concertId}</p>
    </div>
  )
}
