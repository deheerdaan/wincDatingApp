import { createProfile } from "./createProfile.js";
import { data } from "./mockData.js";

function matchProfiles() {
  const matchedProfiles = {};
  let amountOfMatches = 0;
  for (let i = 0; i < data.length; i++) {
    const currentProfile = data[i];
    if (
      currentProfile.age >= profile.min_age_interest &&
      currentProfile.age <= profile.max_age_interest
    ) {
      if (
        profile.age >= currentProfile.min_age_interest &&
        profile.age <= currentProfile.max_age_interest
      ) {
        if (
          profile.gender === currentProfile.gender_interest &&
          currentProfile.gender === profile.gender_interest
        ) {
          if (profile.location === currentProfile.location) {
            matchedProfiles[amountOfMatches] = currentProfile;
            amountOfMatches++;
          }
        }
      }
    }
  }
  return { matchedProfiles, amountOfMatches };
}

function printMatchedProfiles() {
  const matches = matchProfiles();
  if (matches.amountOfMatches === 0) {
    console.log(
      `Unfortunately we found ${matches.amountOfMatches} matches, maybe next time!`
    );
  } else {
    console.log(`We found ${matches.amountOfMatches} matches!`);
    for (let i = 0; i < matches.amountOfMatches; i++) {
      const person = matches.matchedProfiles[i];
      console.log(
        `You matched with ${person.first_name} ${person.last_name}, ${person.age} years old and located in a ${person.location} `
      );
    }
  }
}

const profile = createProfile();
if (profile.age !== undefined) {
  if (profile.min_age_interest !== undefined) {
    printMatchedProfiles();
  }
}
