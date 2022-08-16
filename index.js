const core = require('@actions/core');
const exec = require('@actions/exec');
const creds = require('/vault/secrets/prisma');

const { console_url: consoleUrl, username, password } = creds;
const registry = core.getInput('registry');
const repository = core.getInput('repository');
const tag = core.getInput('tag');
const image = `${registry}/${repository}:${tag}`;
const tar = `${repository}.tar`;

async function run() {
    core.info(`Pulling docker image: ${image}`);
    const dockerPullArgs = [
        'pull',
        image
    ];
    await exec.exec('docker', dockerPullArgs)
        .catch(e => { core.setFailed(e.message); });

    core.info(`Building tarball: ${tar}`);
    const dockerSaveArgs = [
        'save',
        image,
        '-o',
        tar
    ];
    await exec.exec('docker', dockerSaveArgs)
        .catch(e => { core.setFailed(e.message); });

    core.info('Running twistcli');
    const twistcliArgs = [
        'twistcli',
        'images',
        'scan',
        '--address',
        consoleUrl,
        '--user',
        username,
        '--password',
        password,
        '--details',
        '--tarball',
        tar
    ];
    await exec.exec('sudo', twistcliArgs)
        .catch(e => { core.setFailed(e.message); });
}

run();
