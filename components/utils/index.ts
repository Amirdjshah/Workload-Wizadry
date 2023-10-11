import moment from "moment";

export const get_date = (date: string) => {
  let d = date;
  if (moment(date).isValid()) {
    d = moment(date).format("DD MMMM YYYY");
  }
  return d;
};

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")?.[1]?.[0]}`,
  };
}

export function saveBase64AsPDF(
  encodedString: string,
  outputFilename: string = "invoice.pdf"
) {
  try {
    const decodedData = atob(encodedString);
    const byteNumbers = new Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteNumbers[i] = decodedData.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = outputFilename;
    link.click();

    console.log(`PDF saved as ${outputFilename}`);
  } catch (error) {
    console.error(`Error saving PDF: ${error}`);
  }
}

export function calculateAverageOrderAmount(data: any) {
  let totalOrderAmount = 0;
  const totalOrders = data.count || 0;

  data?.results?.forEach((order: any) => {
    const orderAmount = order.amount_total || 0;
    totalOrderAmount += orderAmount;
  });

  if (totalOrders === 0) {
    return 0;
  }

  const averageOrderAmount = totalOrderAmount / totalOrders;
  return averageOrderAmount;
}
export function calculateTotalSpend(data: any) {
  let totalSpend = 0;

  data?.results?.forEach((order: any) => {
    const orderTotal = order.amount_total || 0;
    totalSpend += orderTotal;
  });

  return totalSpend;
}

export function calculateTotalProductOrdered(data: any) {
  let totalProductOrdered = 0;

  data?.results?.forEach((order: any) => {
    order.order_line.forEach((orderLine: any) => {
      const productQty = orderLine.product_uom_qty || 0;
      totalProductOrdered += productQty;
    });
  });

  return totalProductOrdered;
}
export const returnArrayIfObj = (data: any) => {
  if (!Array.isArray(data)) return [];
  return data;
};

export function hasUsersWithAllLevels(
  usersArrays: any,
  targetLevel: number
): boolean {
  for (const users of usersArrays) {
    const userLevels = new Set(users.map((user: any) => user.level));
    let allLevelsBelowTarget = true;

    for (let i = 1; i < targetLevel; i++) {
      if (!userLevels.has(i)) {
        allLevelsBelowTarget = false;
        break;
      }
    }

    if (allLevelsBelowTarget) {
      return true;
    }
  }

  return false;
}

export function allItemsRepeated(array1: any, array2: any): boolean {
  for (const item of array1) {
    if (!array2?.includes(item)) {
      return false; // Found an item that is not repeated
    }
  }
  return true; // All items in array1 are repeated in array2
}

export const imageToBase64 = (file: File): any => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export function downloadFileFromBase64(
  base64val: any,
  filename: string,
  type: string
) {
  // Extract the file extension from the 'type' string
  const extension = type.split("/")[1].split(";")[0];

  // Create a Blob from the base64 data
  const byteCharacters = atob(base64val);
  const byteArrays = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([byteArrays], { type: type });

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${filename}.${extension}`;

  // Append the link to the body and click it to initiate download
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Clean up
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(downloadLink.href);
}

export const getFileExtension = (fileName: string) =>
  fileName?.split(".")?.at(-1) || "";

export const getStockOptions = (stock: number) => {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      color: "error",
    };
  }
  if (stock < 3) {
    return {
      label: "Low on Stock",
      color: "warning",
    };
  }
  return {
    label: "In Stock",
    color: "primary",
  };
};
