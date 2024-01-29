// Interfaces
interface DCData {
    name: { u: string };
    Power: { v: number; u: string; d: number };
    Voltage: { v: number; u: string; d: number };
    Current: { v: number; u: string; d: number };
    YieldDay: { v: number; u: string; d: number };
    YieldTotal: { v: number; u: string; d: number };
    Irradiation?: { v: number; u: string; d: number };
  }
  
  interface ACData {
    Power: { v: number; u: string; d: number };
    Voltage: { v: number; u: string; d: number };
    Current: { v: number; u: string; d: number };
    PowerDC: { v: number; u: string; d: number };
    YieldDay: { v: number; u: string; d: number };
    YieldTotal: { v: number; u: string; d: number };
    Frequency: { v: number; u: string; d: number };
    PowerFactor: { v: number; u: string; d: number };
    ReactivePower: { v: number; u: string; d: number };
    Efficiency: { v: number; u: string; d: number };
  }
  
  interface Inverter {
    serial: string;
    name: string;
    order: number;
    data_age: number;
    poll_enabled: boolean;
    reachable: boolean;
    producing: boolean;
    limit_relative: number;
    limit_absolute: number;
    AC: { [key: number]: ACData };
    DC: { [key: number]: DCData };
    INV: { [key: number]: { Temperature: { v: number; u: string; d: number } } };
    events: number;
  }
  
  interface TotalData {
    Power: { v: number; u: string; d: number };
    YieldDay: { v: number; u: string; d: number };
    YieldTotal: { v: number; u: string; d: number };
  }
  
  interface HintsData {
    time_sync: boolean;
    radio_problem: boolean;
    default_password: boolean;
  }
  
  interface SolarData {
    inverters: Inverter[];
    total: TotalData;
    hints: HintsData;
  }
  
  // Function to Load JSON Data
  async function loadData(): Promise<SolarData> {
    const response = await fetch('https://frozenassassine.de/openDTU/getlivedata');
    const data = await response.json();
    return data as SolarData;
  }
  
  // Example Call
  loadData().then((solarData) => {
    // Access loaded data here and display it in a structured way
    console.log(solarData.inverters[0].name);
    console.log(solarData.total.Power.v);
    // ... additional displays or processing
  });