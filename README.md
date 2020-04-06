# Version appendix action

This action creates an appendix to a semantic version depending on the current branch and github run number.



## Inputs:

* `github-ref` (required): Use the environment variable `${{ github.ref }}`.
* `github-run-number` (required): Use the environment variable `${{ github.run_number }}`.

## Output:

`appendix`:

**without run number:**

| Branch | Appendix |
| ------ | -------- |
| master | `RELEASE` |
| release | `RC` |
| release/\<branchName> | `RC-<branchName>` |
| develop | `SNAPSHOT` |
| \<branchName> | `SNAPSHOT-<branchName>` |

**with run number:**

| Branch | Appendix |
| ------ | -------- |
| master | `RELEASE.<github.run_number>` |
| release | `RC.<github.run_number>` |
| release/\<branchName> | `RC-<branchName>.<github.run_number>` |
| develop | `SNAPSHOT.<github.run_number>` |
| \<branchName> | `SNAPSHOT-<branchName>.<github.run_number>` |


## Example usage

**For use without github run number:**

```
uses: bdruesedow-imp/version-appendix-action@master
id: appendix-action
with:
  github-ref: ${{ github.ref }}

- name: Get the version to variable
  run: |
    echo ::set-env name=APPENDIX::${{ steps.appendix-action.outputs.appendix }}
```

**For use with github run number:**

```
uses: bdruesedow-imp/version-appendix-action@master
id: appendix-action
with:
  github-ref: ${{ github.ref }}
  github-run-number: ${{ github.run_number }}
  use-run-number: true

- name: Get the version to variable
  run: |
    echo ::set-env name=APPENDIX::${{ steps.appendix-action.outputs.appendix }}
```
