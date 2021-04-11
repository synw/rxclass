import { RxRest } from "@/rxclass";
import { ref } from "@vue/reactivity";

interface EmployeeParams {
  id: number;
  name: string;
  salary: number;
}

class Employee {
  public id: number;
  public name: string;
  public salary: number;

  constructor(params: EmployeeParams) {
    this.id = params.id;
    this.name = params.name;
    this.salary = params.salary;
  }

  get salaryLabel(): string {
    return `${this.salary} $`
  }
}

class Employees extends RxRest {
  public all = ref<Array<Employee>>([]);

  constructor() {
    super("http://localhost:8080");
  }

  async load(): Promise<void> {
    const uri = "/employees.json";
    const data = await this.fetchGetArray<Record<string, string>>(uri);
    const employees = new Array<Employee>();
    data.forEach((dataPoint) => {
      const employee = new Employee({
        id: parseInt(dataPoint.id),
        name: `${dataPoint.employee_name}`,
        salary: parseInt(dataPoint.employee_salary)
      } as EmployeeParams);
      employees.push(employee);
    });
    this.all.value = employees;
  }
}

export { Employee, Employees };