export const preferences = [
  {
    id: "local_currency",
    title: "Local currency",
    description: "Enter your currency",
    fields: [{ type: "currency", label: "Write your currency", value: "" }],
  },
  {
    id: "code_value",
    title: "Code value",
    description: "Enter the price you charge per region",
    fields: [
      { type: "foundation", label: "Foundation", value: "" },
      { type: "countor_upper", label: "Contour Upper Face", value: "" },
      { type: "counter_lower", label: "Contour Lower Face", value: "" },
      { type: "refinement_periorbital", label: "Refinement Periorbital", value: "" },
      { type: "refinement_perioral", label: "Refinement Perioral", value: "" },
    ],
  },
  // {
  //   id: "profit_margin",
  //   title: "Profit margin",
  //   description: "Enter the price you charge per region",
  //   fields: [
  //     { type: "vm", label: "VM", value: "" },
  //     { type: "vx", label: "VX", value: "" },
  //     { type: "vl", label: "VL", value: "" },
  //     { type: "vb", label: "VB", value: "" },
  //     { type: "btx", label: "BTX", value: "" },
  //     { type: "haca", label: "HACA", value: "" },
  //     { type: "skv", label: "SKV", value: "" },
  //   ],
  // },
  {
    id: "product_value",
    title: "Product value",
    description: "Enter the product value",
    fields: [
      { type: "vm", label: "VM", value: "" },
      { type: "vx", label: "VX", value: "" },
      { type: "vl", label: "VL", value: "" },
      { type: "vb", label: "VB", value: "" },
      { type: "btx", label: "BTX", value: "" },
      { type: "haca", label: "HACA", value: "" },
      { type: "skv", label: "SKV", value: "" },
    ],
  },
];
