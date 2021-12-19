![All Contributors](https://img.shields.io/badge/licence-MIT-brightgreen)
![All Contributors](https://img.shields.io/badge/PRs-welcome-brightgreen)

# Ecommerce web app Server api

An e-commerce web app that allows merchants to sell products and also allows users to order for product(s).

## Technologies Used

- NodeJs
- GraphQL
- Apollo-Server
- TypeScript
- PostgreSQL

## Features

- User can signup as merchant or non-merchant
- User can signin

- Merchant can add product by category
- Merchant can update product
- Merchant can delete product
- Merchant can read product added
- Merchant can read order created by user
- Merchant can update order status from user to either Out-of-Stock, Enroute or Delivered
- Merchant can read profile
- Merchant can update profile
- Merchant can read successful product delivered count
- Merchant can read product added count

- Non-merchant can create order
- Non-merchant can cancel order when status is processing
- Non-merchant can read order history
- Non-merchant can checkout product for payment
- Non-merchant can read profile
- Non-merchant can update profile

## Prerequisites

The following should be installed in your machine

- Node.Js v10.13.0+
- Npm
- PostgreSQL

## How To Install And Run The Application

- Clone this Repo and `cd` into it
- Clone client repo [Here](https://github.com/Nelson-Chinedu/Ecommerce-client) and `cd` into it
- Install the dependencies on `Client` and `Server` repo by running `yarn install` or `npm install`
- Create .env file with values using keys from .env.sample server repo
- Start server application on development mode by running `yarn dev` or `npm run dev`

## How To Contribute

Kindly refer to the guide above to setup, and reachout to author for further instructions

## Issues

Issues are always very welcome. Please be sure to create a constructive issue when necessary.

## Pull Requests

Pull request are welcome if anything is missing or something is buggy. However, there are a couple of things you can do to make life easier for the maintainers.

- Explain the issue that your PR is solving - or link to an existing issue
- Follow the repository structure, and new sections in the corresponding folders
- Ask questions to admin if unclear
