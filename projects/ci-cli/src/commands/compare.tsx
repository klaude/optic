import { useEffect } from "react";
import React from "react";
import * as path from "path";
import { inGit } from "@useoptic/openapi-utilities/build/loaders/file-on-branch";
import {
  SpecFromInput,
  SpecVersionFrom,
} from "../input-helpers/compare-input-parser";
import { render, Text, Newline, useApp } from "ink";

import {
  parseOpenAPIFromRepoWithSourcemap,
  ParseOpenAPIResult,
  parseOpenAPIWithSourcemap,
} from "@useoptic/openapi-utilities/build/parser/openapi-sourcemap-parser";
import { useAsync, useAsyncFn } from "react-use";
import { FunctionReturningPromise } from "react-use/lib/misc/types";
import { AsyncState } from "react-use/lib/useAsyncFn";

export function Compare(props: {
  from: SpecFromInput;
  to: SpecFromInput;
  rules: string;
}) {
  const loadFrom = useAsync(
    async () => await specFromInputToResults(props.from, process.cwd())
  );
  const loadTo = useAsync(
    async () => await specFromInputToResults(props.to, process.cwd())
  );

  const specsLoaded = !loadFrom.loading && !loadFrom.loading;

  const [state, sendCheckRequest] = useAsyncFn(() => {
    return Promise.resolve();
  }, []);

  const { exit } = useApp();

  useEffect(() => {
    if (loadFrom.error || loadTo.error) {
      setTimeout(() => exit(), 200);
    }
  }, [loadFrom, loadTo]);

  const errorLoadingSpec = loadFrom.error || loadTo.error;

  const loadStatus = (spec: string, promise: AsyncState<any>) => {
    return (
      <Text color="black">
        {spec} specification:{" "}
        {promise.loading && (
          <Text color="green" bold>
            loading...
          </Text>
        )}
        {promise.error && (
          <Text color="red" bold>
            {promise.error.message.split("\n")[0]}
          </Text>
        )}
        {!promise.loading && !promise.error && (
          <Text color="green" bold>
            done
          </Text>
        )}
      </Text>
    );
  };

  useEffect(() => {
    if (specsLoaded) sendCheckRequest();
  }, [loadFrom, loadTo]);

  return (
    <>
      <Text color="blue" bold>
        Loading specifications for comparison:
      </Text>

      {loadStatus("Current", loadFrom)}
      {loadStatus("Next", loadTo)}

      {errorLoadingSpec && (
        <Text color="red">
          Stopping. Could not load two specifications to compare
        </Text>
      )}
      {specsLoaded && (
        <>
          <Text>{JSON.stringify(state)}</Text>
        </>
      )}
    </>
  );
}

async function specFromInputToResults(
  input: SpecFromInput,
  workingDir: string = process.cwd()
): Promise<ParseOpenAPIResult> {
  switch (input.from) {
    case SpecVersionFrom.empty:
      return {
        jsonLike: input.value,
        sourcemap: { files: [], map: [] },
      };
    case SpecVersionFrom.git: {
      const gitRepo = await inGit(path.join(workingDir, input.name));
      if (!gitRepo) {
        throw new Error(`${input.name} is not in a git repo`);
      }
      return await parseOpenAPIFromRepoWithSourcemap(
        input.name,
        gitRepo,
        input.branch
      );
    }
    case SpecVersionFrom.file:
      return await parseOpenAPIWithSourcemap(input.filePath);
  }
}