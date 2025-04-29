# Doctor Data Model for Firebase

This document describes the data model for storing doctor information in Firebase.

## Doctor Schema

Each doctor will be represented as a document in a "doctors" collection within Firebase. Each document will have the following fields:

| Field           | Type   | Description                                   |
| --------------- | ------ | --------------------------------------------- |
| `id`            | String | Unique identifier for the doctor.              |
| `name`          | String | Full name of the doctor.                       |
| `specialization`| String | The doctor's area of specialization.           |
| `address`       | String | Street address of the doctor's clinic.         |
| `city`          | String | City where the doctor's clinic is located.     |
| `state`         | String | State where the doctor's clinic is located.    |
| `pincode`       | String | Postal code of the doctor's clinic location. |
| `contactNumber` | String | Phone number for contacting the doctor.       |
| `about`         | String | A brief description about the doctor.          |

## Example Data