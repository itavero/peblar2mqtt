/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/health': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Generic API information
     * @description This endpoint can be accessed without authorization token and contains basic API information.
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Succes. The response contains generic API information. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              /** @description Defines the version of this API. The version consists of a major and a minor number.
               *     A change in major version indicates breaking changes in existing functionality.
               *     A minor version increase indicates added functionality to the existing major version.
               *      */
              ApiVersion?: string;
              /** @description The currently configured access mode of the API can be either:
               *       - "ReadOnly": Only read requests are responded to. No data or configuration values can be written with the API.
               *       - "ReadWrite": Both read and write requests are responded to.
               *      */
              AccessMode?: string;
            };
          };
        };
        /** @description Bad request. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Error condition */
        default: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ApiError'];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/system': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Generic system information */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Succes. The response contains some basic system information. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              /** @description The product number. */
              ProductPn?: string;
              /** @description The product serial number. */
              ProductSn?: string;
              /** @description Firmware version identifier. */
              FirmwareVersion?: string;
              /** @description WLAN signal strength in dBm. If the device is not connected to WLAN, null is returned. */
              WlanSignalStrength?: number;
              /** @description Cellular signal strength in dBm. If the device is not connected to a cellular network, null is returned. */
              CellularSignalStrength?: number;
              /** @description Uptime of the charger since last boot in seconds. */
              Uptime?: number;
              /** @description The amount of physical connected phases either limited by hardware or configured during installation. */
              PhaseCount?: number;
              /** @description Defines if the charger supports charging with only 1 phase while it is a 3 phase charger. Returns false for single phase charger or 4-pole relays based chargers. */
              Force1PhaseAllowed?: boolean;
              /** @description An integer array with active error codes. */
              ActiveErrorCodes?: unknown[];
              /** @description An integer array with active warning codes. */
              ActiveWarningCodes?: unknown[];
            };
          };
        };
        /** @description Bad request. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Unauthorized. An API token is required. */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Error condition */
        default: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ApiError'];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/evinterface': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get EV interface information */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Succes. The response contains information about the EV interface state. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['EVInterfaceResponse'];
          };
        };
        /** @description Bad request. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Unauthorized. An API token is required. */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Error condition */
        default: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ApiError'];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /**
     * Update EV interface fields
     * @description If fields that do not exist in this resource, 400 Bad Request is returned.
     *     If read-only fields are provided, 403 Forbidden is returned.
     *     To use the patch function the local REST API must be configured to ReadWrite access mode.
     *
     */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          /** @example {
           *       "ChargeCurrentLimit": 14000,
           *       "Force1Phase": true
           *     } */
          'application/json': {
            /** @description The maximum current per phase indicated towards the EV in milliAmpere by this API. Note that other factors can cause an even lower limit (e.g. thermal or dynamic load balancing).
             *      */
            ChargeCurrentLimit?: number;
            /** @description Use only 1 phase for charging on the next charging cycle (if supported). If charging is already ongoing, a switch-over from 3 to 1 phase is done automatically by the charger.
             *      */
            Force1Phase?: boolean;
          };
        };
      };
      responses: {
        /** @description Success. The response contains information about the EV interface state. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['EVInterfaceResponse'];
          };
        };
        /** @description Bad request. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Unauthorized. An API token is required. */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Forbidden. Read-only fields are not allowed in the body. */
        403: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Error condition */
        default: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ApiError'];
          };
        };
      };
    };
    trace?: never;
  };
  '/meter': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get meter information */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Succes. The response contains current, voltage, power and energy information measured by the chargers embedded energy meter. */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              /**
               * Format: int32
               * @description The instantaneous current on phase 1 in milliAmperes.
               */
              CurrentPhase1?: number;
              /**
               * Format: int32
               * @description The instantaneous current on phase 2 in milliAmperes.
               */
              CurrentPhase2?: number;
              /**
               * Format: int32
               * @description The instantaneous current on phase 3 in milliAmperes.
               */
              CurrentPhase3?: number;
              /**
               * Format: int32
               * @description The instantaneous voltage on phase 1 in Volts.
               */
              VoltagePhase1?: number;
              /**
               * Format: int32
               * @description The instantaneous voltage on phase 2 in Volts. If no valid measurement can be made, null is returned.
               */
              VoltagePhase2?: number;
              /**
               * Format: int32
               * @description The instantaneous voltage on phase 3 in Volts. If no valid measurement can be made, null is returned.
               */
              VoltagePhase3?: number;
              /**
               * Format: int32
               * @description The instantaneous active power on phase 1 in Watts.
               */
              PowerPhase1?: number;
              /**
               * Format: int32
               * @description The instantaneous active power on phase 2 in Watts.
               */
              PowerPhase2?: number;
              /**
               * Format: int32
               * @description The instantaneous active power on phase 3 in Watts.
               */
              PowerPhase3?: number;
              /**
               * Format: int32
               * @description The combined instantaneous active power on phases 1, 2 and 3.
               */
              PowerTotal?: number;
              /**
               * Format: int64
               * @description The lifetime energy supplied by the charger in Wh.
               */
              EnergyTotal?: number;
              /**
               * Format: int64
               * @description The energy supplied by the charger from the last or pending charging session in Wh.
               */
              EnergySession?: number;
            };
          };
        };
        /** @description Bad request. */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Unauthorized. */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Error condition */
        default: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ApiError'];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** @description The error payload from the REST API. */
    ApiError: {
      /**
       * @description The error message as string.
       * @example An internal server error occurred
       */
      statusmsg: string;
    };
    EVInterfaceResponse: {
      /** @description The current state of the Control Pilot which can be:
       *       - State A: No EV connected
       *       - State B: EV connected but suspended by either EV or charger
       *       - State C: EV connected and charging
       *       - State D: Same as C but ventilation requested (not supported)
       *       - State E: Error, short to PE or powered off
       *       - State F: Fault detected by charger
       *       - Invalid: Invalid CP level measured
       *       - Unknown: CP signal cannot be measured.
       *
       *     See [Electric vehicle conductive charging systems - part 1: general requirements, IEC 61851-1, Edition 3.0, 2017-2] for more details on these states.
       *      */
      CpState?: string;
      /** @description The current state of the socket lock (false = unlocked, true = locked). This value is not present on fixed cable systems. */
      LockState?: boolean;
      /** @description The maximum current indicated towards the EV in milliAmpere by this API. Note that other factors can cause an even lower limit (e.g. thermal); These are communicated via the fields ChargeCurrentLimitSource and ChargeCurrentLimitActual.
       *      */
      ChargeCurrentLimit?: number;
      /** @description One of the following sources will be actively limiting the charging current:
       *
       *       - Charging cable: The maximum rated current of the attached cable.
       *       - High temperature: Charger internal temperature.
       *       - Installation limit: The maximum installation current configured during commissioning.
       *       - Dynamic load balancing: Household installation phase current reached maximum.
       *       - Group load balancing: A maximum communicated by the leader of the group.
       *       - Overcurrent protection: EV exceeded communicated maximum current.
       *       - Hardware limitation: Physical limits of the charger.
       *       - Power factor: EV charged with too low power factor.
       *       - OCPP smart charging: Smart charging profile installed by CPO.
       *       - Phase imbalance: Too much imbalance between phases.
       *       - Local scheduled charging: Locally configured scheduled charging.
       *       - Solar charging: Amount of exported energy.
       *       - Current limiter: User selected limit via web web-interface.
       *       - Local REST API: Limit set by this API.
       *       - Local Modbus API: Limit set by the Modbus API.
       *       - External power limit: External IO defined limit.
       *       - Household power limit: Total household power capacity limit.
       *      */
      ChargeCurrentLimitSource?: string;
      /** @description The actual current which is communicated to the vehicle per phase. This is the lowest current of all limiting sources. */
      ChargeCurrentLimitActual?: number;
      /** @description Use only 1 phase for charging (if supported by the charger, see "Force1PhaseAllowed"). If a charging session is already ongoing, a switch-over from 3 to 1 phase is done automatically by the charger. */
      Force1Phase?: boolean;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
