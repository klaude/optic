import { v4 as uuidv4 } from "uuid";
// TODO created shared instance to import from (optic cloud fe + here)

class JsonHttpClient {
  // Create overridable this.fetch instance
  fetch: typeof fetch = fetch;

  private async verifyOkResponse(response: Response) {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `expected a successful response. got ${response.status} ${response.statusText} \n${text}`
      );
    }
    return text;
  }

  private async handleJsonResponse(response: Response) {
    if (response.ok) {
      if (response.status === 204) {
        return;
      }
      const json = await response.json();
      return json;
    } else {
      const text = await response.text();
      throw new Error(`${response.status} ${response.statusText} \n${text}`);
    }
  }

  async getJson<T = any>(
    url: string,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        ...additionalHeaders,
      },
    }).then(this.handleJsonResponse);
  }

  async getJsonWithoutHandlingResponse(url: string) {
    return this.fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async postJsonString<T = any>(
    url: string,
    body: string,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.fetch(url, {
      method: "POST",
      body,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...additionalHeaders,
      },
    }).then(this.handleJsonResponse);
  }

  async postJson<T = any>(
    url: string,
    body: any,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.postJsonString<T>(url, JSON.stringify(body), additionalHeaders);
  }

  async patchJsonString<T = any>(
    url: string,
    body: string,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.fetch(url, {
      method: "PATCH",
      body,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...additionalHeaders,
      },
    }).then(this.handleJsonResponse);
  }

  async patchJson<T = any>(
    url: string,
    body: any,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.patchJsonString<T>(
      url,
      JSON.stringify(body),
      additionalHeaders
    );
  }

  async postJsonWithoutBody<T = any>(
    url: string,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        ...additionalHeaders,
      },
    }).then(this.handleJsonResponse);
  }

  async getJsonAsText(url: string) {
    return this.fetch(url, {
      headers: {
        accept: "application/json",
      },
    }).then(this.verifyOkResponse);
  }

  async putJson<T = any>(
    url: string,
    body: object,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.putJsonString<T>(url, JSON.stringify(body), additionalHeaders);
  }

  async putJsonString<T = any>(
    url: string,
    body: string,
    additionalHeaders: Record<string, string> = {}
  ): Promise<T> {
    return this.fetch(url, {
      method: "PUT",
      body: body,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...additionalHeaders,
      },
    }).then(this.handleJsonResponse);
  }

  async putBytes(
    url: string,
    body: Buffer,
    additionalHeaders: Record<string, string> = {}
  ) {
    return this.fetch(url, {
      method: "PUT",
      body,
      headers: {
        "content-length": body.length.toString(),
        ...additionalHeaders,
      },
    }).then(this.verifyOkResponse);
  }
}

export enum SessionType {
  GithubActions = "GithubActions",
}

type RunArgs = {
  from?: string;
  to: string;
  context: string;
  rules: string;
};

type Session = {
  type: SessionType.GithubActions;
  run_args: RunArgs;
  github_data: {
    organization: string;
    repo: string;
    pull_request: number;
    run: number;
    run_attempt: number;
  };
};

// TODO figure out what the parameters we need are
export class OpticBackendClient extends JsonHttpClient {
  constructor(
    private baseUrl: string,
    private getAuthToken: () => Promise<string>
  ) {
    super();
  }

  fetch: typeof fetch = async (requestUri, options = {}) => {
    const token = await this.getAuthToken();
    const headers = options.headers || {};

    return fetch(`${this.baseUrl}${requestUri}`, {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  public async getUploadUrl(): Promise<string> {
    return "";
  }

  public async saveCiRun() {}

  // TODO make this function signature generic such that SessionType changes what session data should look like
  public async startSession(
    sessionType: SessionType,
    sessionData: Omit<Session, "type">
  ): Promise<string> {
    const sessionId = uuidv4();

    this.postJson(
      `/api/spec-comparison-sessions/${sessionId}/commands/start-session`,
      {
        session: {
          type: sessionType,
          data: {
            ...sessionData,
          },
        },
      }
    );
    return sessionId;
  }
}