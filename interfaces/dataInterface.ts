export interface IBreadCrumb {
  label: string;
  href?: string;
  index: number;
}

export interface ICategoryFilter {
  label: string;
  href: string;
}

export interface IAccessToken {
  token: string;
  role_code: string;
}

export interface IOrderResponse {
  data: { count: number; results: IOrder[] };
}
export interface IMessage {
  body: null | string;
  display_name: string;
  id: string;
  attachment_ids: {
    display_name: string;
    id: number;
    raw: any;
  }[];
  create_uid: {
    city: string;
    name: string;
    id: number;
  };
}

interface Move {
  id: number;
  display_name: string;
  name: string;
  date: string;
  date_deadline: string;
  is_locked: boolean;
  move_line_ids: number;
  move_lines_count: number;
  picking_id: number;
  product_id: number;
  product_qty: number;
  quantity_done: number;
  state: string;
}

interface Picking {
  id: number;
  display_name: string;
  date: string;
  date_done: string | null;
  is_signed: boolean | null;
  is_locked: boolean;
  move_ids: Move[];
  name: string;
  note: string | null;
  origin: string;
  partner_id: number;
  product_id: number;
  priority: string;
  sale_id: number;
  state: string;
  picking_type_code: string;
}
export interface IOrder {
  id: string;
  amount_tax: number;
  name?: string;
  amount_total: number;
  vessel: string;
  x_signature_confirm: any;
  x_signature_type: string;
  picking_ids: Picking[];
  validity_date: string;
  amount_undiscounted: number;
  amount_untaxed: number;
  cart_quantity: number;
  client_order_ref: null | string;
  company_id: number;
  country_code: string;
  create_date: string;
  currency_id: number;
  submit_price: boolean;
  currency_rate: number;
  date_order: string;
  deliver_date: null | string;
  delivery_count: number;
  delivery_status: string;
  display_name: string;
  due_amount: number;
  effective_date: string;
  expected_date: string;
  has_due: null | boolean;
  has_message: boolean;
  invoice_count: number;
  is_checked: boolean;
  invoice_ids: null | any[]; // TODO: Invoice info
  invoice_status: string;
  is_abandoned_cart: null | boolean;
  is_expired: null | boolean;
  message_ids: Message[];
  note: string;
  order_line: IOrderLine[];
  origin: string;
  partner_id: Partner;
  partner_invoice_id: LocationData;
  partner_shipping_id: LocationData;
  payment_term_id: any; // Replace with proper type if possible
  reference: null; // Replace with proper type if possible
  remarks: null; // Replace with proper type if possible
  require_payment: null; // Replace with proper type if possible
  require_signature: boolean;
  shop_warning: null; // Replace with proper type if possible
  signature: null; // Replace with proper type if possible
  signed_by: null; // Replace with proper type if possible
  signed_on: null; // Replace with proper type if possible
  state: string;
  user_id: User;
  approval_history_ids: any;
  approval_status_flow: {
    buttonType: "approve" | "confirm" | "quoteConfirm";
    message: string;
    showButton: boolean;
  };
  message_attachment_count: number;
  message_main_attachment_id: number;
}

interface LocationData {
  city: string;
  contact_address: string;
  country_code: string;
  country_id: Country;
  id: number;
  name: null | string;
  phone: null | string;
  state_id: State;
  street: string;
  street2: string;
}

interface Country {
  id: number;
  name: string;
}

interface State {
  id: number;
  name: string;
}
interface Message {
  id: number;
  display_name: string;
  body: null | string;
  create_uid: User;
}

interface OrderLine {
  id: number;
  product_template_id: number;
  product_id: Product;
}

interface Product {
  id: number;
}

interface Partner {
  id: number;
  name: string;
  city: null | string;
  phone: string;
  email: string;
}

interface PartnerInvoice extends Partner {
  contact_address: string;
}

interface PartnerShipping extends Partner {
  contact_address: string;
}

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  type: string;
  default_code: string;
  barcode: string | null;
  categ_id: Category;
  attribute_line_ids: any[]; // Replace 'any' with proper type if possible
  product_variant_id: ProductVariant;
}

interface Category {
  id: number;
  name: string;
}

interface Tax {
  id: number;
  name: string;
  real_amount: number;
}

interface InvoiceLine {
  // Define properties for invoice lines if needed
}

export interface IOrderLine {
  id: number;
  name: string;
  name_short: string;
  product_template_id: number;
  client_order_ref: string;
  vessel: string;
  qty_delivered: number;
  qty_to_deliver: number;
  qty_invoiced: number;
  qty_to_invoice: number;
  state: string;
  invoice_status: string;
  product_id: Product;
  product_uom_qty: number;
  product_uom: {
    name: string;
  };
  price_unit: number;
  tax_id: Tax[];
  discount: number;
  price_tax: number;
  price_subtotal: number;
  price_total: number;
  invoice_lines: InvoiceLine[];
}

export interface IFavoriteItemProduct {
  id: number;
  name: string;
  type: string;
  barcode: null | string;
  categ_id: {
    id: number;
    name: string;
  };
  attribute_line_ids: {
    id: number;
    display_name: string;
  }[];
}
export interface IFavoriteItem {
  id: number;
  display_name: string;
  product_id: IFavoriteItemProduct;
}

export interface IFavoriteResponse {
  count: number;
  results: IFavoriteItem[];
}
export interface IProduct {
  product_template_image_ids: any[];
  id: number;
  name: string;
  qty_available?: number;
  display_name: string;
  active: boolean;
  type: string;
  list_price: number;
  taxes_id: null | any;
  standard_price: number;
  categ_id: {
    id: number;
    name: string;
  };
  description_sale: null | string;
  default_code: null | any;
  attribute_line_ids: AttributeLine[];
  purchase_method: string;
  cost_currency_id: number;
  priority: string;
  product_variant_id: ProductVariant[];
}

export interface AttributeLine {
  id: number;
  display_name: string;
  value_count: number;
  value_ids: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  name: string;
  display_name: string;
}

export interface ProductVariant {
  id: number;
  display_name: string;
}
export interface CartItem {
  id: number;
  display_name: string;
  quantity: number;
  product_id: {
    id: number;
    name: string;
    type: string;
    barcode: null | string;
    categ_id: {
      id: number;
      name: string;
    };
    product_variant_id: {
      display_name: string;
      id: number;
    };
    attribute_line_ids: Array<{
      id: number;
      display_name: string;
    }>;
  };
}

export interface ICart {
  id: number;
  __last_update: string;
  create_date: string;
  write_date: string;
  customer_id: {
    id: number;
    display_name: string;
  };
  display_name: string;
  cart_items: CartItem[];
}

export interface ICompany {
  id: number;
  name: string;
  display_name: string;
  date: string | null;
  title: string | null;
  parent_id: number | null;
  parent_name: string | null;
  child_ids: Child[];
  ref: string | null;
  lang: string;
  user_id: number | null;
  category_id: number | null;
  active: boolean;
  employee: string | null;
  type: string;
  street: string;
  street2: string;
  zip: string | null;
  city: string;
  state_id: number;
  country_id: number;
  country_code: string;
  email: string | null;
  email_formatted: string | null;
  phone: string | null;
  mobile: string | null;
  is_company: boolean;
  is_public: boolean | null;
  industry_id: number | null;
  company_type: string;
  company_id: number | null;
  user_ids: number[] | null;
  partner_share: boolean;
  contact_address: string;
  company_name: string | null;
  team_id: number | null;
  partner_gid: number;
  additional_info: string | null;
  role: string | null;
  currency_id: number;
  district: string;
  required_approval: boolean;
  approval_ids: Approval[];
}

interface Child {
  id: number;
  name: string;
}

interface Approval {
  id: number;
  level: number;
  pricing_rules: any | null;
  user_id: number;
  minimum_price: number;
}
