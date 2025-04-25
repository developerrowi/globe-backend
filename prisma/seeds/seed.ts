import { serviceSeed } from "./services.seed";

async function seed() {
  await serviceSeed();
}

seed()