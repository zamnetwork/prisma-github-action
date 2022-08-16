# prisma-github-action
This Github action runs Prisma Cloud's Twistcli to scan a docker image for vulnerabilities. 

## Inputs

## `registry`

**Required** The name of the Docker registry.

## `repository`

**Required** The name of the Docker repository.

## `tag`

**Required** The Docker image tag.

## Example usage

```yaml
uses: zamnetwork/prisma-github-action@v1.0.0
with:
  registry: 'docker.zam.com'
  repository: 'message-service'
  tag: 'v1.0.0'
```