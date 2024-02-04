import { faker } from '@faker-js/faker';
import { AuthRoleEnum } from '@core/entities';
import { AuthUserUiState } from '@shared/domains/auth/auth.uiState';

function getUser(isAdmin = false) {
  const result: AuthUserUiState = {
    id: faker.string.uuid(),
    profileImage: faker.image.avatar(),
    username: faker.person.fullName(),
    role: isAdmin ? AuthRoleEnum.ADMIN : AuthRoleEnum.MEMBER,
    email: faker.internet.email(),
  };

  return result;
}

export const userFixtures = {
  getUser,
};
