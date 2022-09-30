export interface OrderItem {
  name: string;
  quantity: number;
}

export interface FoodOrder {
  customerId: string;
  customerName: string;
  address: string;
  items: OrderItem[];
}

// export interface CloudEvent<T> {
//   /**
//    * Type of event related to the originating occurrence.
//    */
//   type: string;
//   /**
//    * Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event.
//    */
//   source: string;
//   /**
//    * An identifier for the event. The combination of id and source must be unique for each distinct event.
//    */
//   id: string;
//   /**
//    * The time the event was generated.
//    */
//   time?: Date;
//   /**
//    * Identifies the schema that data adheres to.
//    */
//   dataschema?: string;
//   /**
//    * Content type of data value.
//    */
//   datacontenttype?: string;
//   /**
//    * Event data specific to the event type.
//    */
//   data?: T;
//   /**
//    * This describes the subject of the event in the context of the event producer (identified by source).
//    */
//   subject?: string;
//   /**
//    * Additional context attributes for the event. The Cloud Event specification refers to these as "extension attributes".
//    */
//   extensionAttributes?: Record<string, unknown>;
// }
