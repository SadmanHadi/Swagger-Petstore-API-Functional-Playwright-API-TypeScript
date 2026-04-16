import { APIRequestContext } from '@playwright/test';
import { GenericApiClient } from '../utils/api/GenericApiClient';
import { ENDPOINTS } from '../utils/config/endpoints';

export class PetClient extends GenericApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async addPet(pet: any) {
    return this.post(ENDPOINTS.PET.BASE, pet);
  }

  async updatePet(pet: any) {
    return this.put(ENDPOINTS.PET.BASE, pet);
  }

  async getPetById(id: number | string) {
    return this.get(ENDPOINTS.PET.BY_ID(id));
  }

  async deletePet(id: number | string) {
    return this.delete(ENDPOINTS.PET.BY_ID(id));
  }

  async findPetsByStatus(status: 'available' | 'pending' | 'sold') {
    return this.get(ENDPOINTS.PET.FIND_BY_STATUS, {
      params: { status }
    });
  }
}
