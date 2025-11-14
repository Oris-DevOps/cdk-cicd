import * as cdk from 'aws-cdk-lib/core';
import { CdkCicdStack } from '../lib/cdk-cicd-stack';
import * as fs from 'fs';

const app = new cdk.App();

// Determine which environment to deploy
const envName = process.env.DEPLOY_ENV || 'dev';

// Load config file dynamically
const config = JSON.parse(fs.readFileSync(`./config/${envName}.json`, 'utf8'));

new CdkCicdStack(app, 'CdkCicdStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  env: { account: '445085439286', region: 'us-east-1' },
  config, // this is an extension from the cdk-cicd-stack.ts

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
