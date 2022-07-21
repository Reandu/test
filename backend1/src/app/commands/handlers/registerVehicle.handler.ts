import { VehicleModel } from "../../../domains/models/vehicle.model";
import { Repository } from "../../../infra/repository/repository";
import { RegisterVehicleCommand } from "../registerVehicle.command";
import { ICommandHandler } from "./interface/commandeHandler.interface";

export class RegisterVehicleCommandHandler
	implements ICommandHandler<RegisterVehicleCommand>
{	
	private repository = Repository.instance

	public async execute(
		command: RegisterVehicleCommand
	): Promise<void> {
		const vehicleEntity = await this.repository.findVehicleById(command.vehicleId);
		const model = vehicleEntity ? vehicleEntity.toModel(): new VehicleModel(command.vehicleId);
		await model.register(command.fleedId);
	};
}
