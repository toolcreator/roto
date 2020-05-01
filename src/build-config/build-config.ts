/*
 * PLEASE DO NOT COMMIT CHANGES TO THIS FILE
 * Except if you're changing build configuration parameters, BUT
 * make sure to work with build-config.ts.in in this case!
*/

interface BuildConfig {
  readonly debug: boolean;
}

export const BUILD_CONFIG: BuildConfig = {
  debug: false
};

