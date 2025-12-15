"use client";
import React, { Component } from "react";
import Image from "next/image";
import { link } from "fs";

interface ProductProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  link: string;
}

export default function Item(props: ProductProps) {
  return (
    <a href={props.link}>
      <div className="item-card">
        <Image
          src={props.src}
          alt={props.alt}
          width={300}
          height={300}
          className="item-image"
        />
        <h2 className="item-title">{props.title}</h2>
        <p className="item-description">{props.description}</p>
        {props.price && <p className="item-price">${props.price.toFixed(2)}</p>}
        <style jsx>{`
          .item-card {
            border: 1px solid #eaeaea;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
/*             transition: box-shadow 0.3s ease;
 */          }
          .item-card:hover {
            /* box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1); */
          }
          .item-image {
            border-radius: 10px;
          }
          .item-title {
            font-size: 1.5rem;
            margin: 10px 0;
          }
          .item-description {
            font-size: 1rem;
            color: #666;
          }
          .item-price {
            font-size: 1.2rem;
            color: #0070f3;
            margin-top: 10px;
          }
        `}</style>
      </div>
    </a>
  );
}
