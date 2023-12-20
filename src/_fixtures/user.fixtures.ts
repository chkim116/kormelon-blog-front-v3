import { faker } from '@faker-js/faker';
import { AuthRoleEnum } from '@shared/entities';
import { AuthUserUiState } from '@features/auth/domains/auth.uiState';

function getUser(isAdmin = false) {
  const result: AuthUserUiState = {
    id: faker.string.uuid(),
    profileImage: faker.image.avatar(),
    username: faker.person.fullName(),
    role: isAdmin ? AuthRoleEnum.ADMIN : AuthRoleEnum.MEMBER,
  };

  return result;
}

export const userFixtures = {
  getUser,
};
