import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { EnvConfig } from './interface';

export interface MyStackProps extends cdk.StackProps {
  config: EnvConfig;
}


export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: MyStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkCicdQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const CodeStarARN: string = 'arn:aws:codeconnections:us-east-1:445085439286:connection/9f1c1ceb-0b58-46c6-b3e0-dd3ecd4999e9';
    // cdk pipeline
    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        //'Oris-DevOps/cdk-cicd'
        input: pipelines.CodePipelineSource.connection(
          `${props?.config.repositoryOwner}/${props?.config.repositoryName}`,
          `${props?.config.branchName}`,{
            connectionArn: `${props?.config.codestarConnectionArn}`,
          }
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });


  }
}
