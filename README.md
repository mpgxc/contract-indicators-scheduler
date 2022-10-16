### /POST schedule

```json
{
  "frequency": "MONTHLY_30",
  "contractId": "5c7f3320-baf0-4f98-9226-01d355bcfb75",
  "customerId": "c02ed235-96f6-4862-9a1c-b29d052556f9",
  "contractIndicatorId": "9ca9744d-c545-45ea-87c2-61f9e8c197ab"
}
```

### /GET schedules

```json
[
  {
    "id": "2c34ad5d-6967-42c2-b9a7-98f46885f3e8",
    "frequency": "MONTHLY_30",
    "nextExecutionDate": "2022-11-14T00:00:00.000Z",
    "lastExecutionDate": null,
    "ContractIndicator": {
      "id": "9ca9744d-c545-45ea-87c2-61f9e8c197ab",
      "type": "AVERAGE_BALANCE",
      "ownerId": "c02ed235-96f6-4862-9a1c-b29d052556f9",
      "balance": "0",
      "threshold": "0",
      "description": "",
      "historyBalance": []
    },
    "Contract": {
      "id": "5c7f3320-baf0-4f98-9226-01d355bcfb75",
      "ownerId": "c02ed235-96f6-4862-9a1c-b29d052556f9"
    },
    "Customer": {
      "id": "c02ed235-96f6-4862-9a1c-b29d052556f9",
      "userName": "mpgxc"
    }
  }
]
```

<img title="a title" alt="Alt text" src="./prisma/ERD.svg">
`
