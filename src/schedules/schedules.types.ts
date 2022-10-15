type Customer = {
  id: string;
  userName: string;
};

type Contract = {
  id: string;
  ownerId: string;
};

type HistorySchedule = {
  balance: string;
  changedAt: Date;
};

type ContractIndicator = {
  id: string;
  type: string;
  balance: string;
  threshold: string;
  description: string;
  historyBalance: HistorySchedule[];
  ownerId: string;
};

type ResponseSchedule = {
  id: string;
  nextExecutionDate: Date;
  lastExecutionDate?: Date | null;
  frequency: string;
  Customer: Customer;
  Contract: Contract;
  ContractIndicator: ContractIndicator;
};

export {
  Customer,
  Contract,
  HistorySchedule,
  ResponseSchedule,
  ContractIndicator,
};
