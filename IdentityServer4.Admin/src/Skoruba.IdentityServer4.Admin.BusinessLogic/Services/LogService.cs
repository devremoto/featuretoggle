﻿using System.Threading.Tasks;
using Skoruba.IdentityServer4.Admin.BusinessLogic.Dtos.Log;
using Skoruba.IdentityServer4.Admin.BusinessLogic.Mappers;
using Skoruba.IdentityServer4.Admin.BusinessLogic.Repositories.Interfaces;
using Skoruba.IdentityServer4.Admin.BusinessLogic.Services.Interfaces;

namespace Skoruba.IdentityServer4.Admin.BusinessLogic.Services
{
    public class LogService : ILogService
    {
        protected readonly ILogRepository Repository;

        public LogService(ILogRepository repository)
        {
            Repository = repository;
        }

        public virtual async Task<LogsDto> GetLogsAsync(string search, int page = 1, int pageSize = 10)
        {
            var pagedList = await Repository.GetLogsAsync(search, page, pageSize);
            var logs = pagedList.ToModel();

            return logs;
        }
    }
}
