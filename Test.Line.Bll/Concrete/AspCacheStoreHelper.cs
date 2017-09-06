using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Caching;
using Test.Line.Bll.Abstract;

namespace Test.Line.Bll
{
    internal class AspCacheStoreHelper<T> : ICacheStoreHelper<T>
    {
        public IEnumerable CacheStore
        {
            get
            {
                return ServerCacheStore.Cast<DictionaryEntry>();
            }
        }

        public bool ContainsKey(string key)
        {
            var res = ServerCacheStore.Cast<DictionaryEntry>().Any(entry => entry.Key.ToString() == key);

            return res;
        }

        public T this[string key]
        {
            get { return (T)ServerCacheStore[key]; }
        }

        public Cache ServerCacheStore
        {
            get { return HttpContext.Current.Cache; }
        }

        

        public void Add(string key, T value)
        {
            ServerCacheStore.Insert(key, value);
        }

        public void Add(string key, T value, TimeSpan expirationTime)
        {
            ServerCacheStore.Insert(key, value, null, DateTime.UtcNow.Add(expirationTime), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
        }

        public void Remove(string key)
        {
            ServerCacheStore.Remove(key);
        }

        public void RemoveContains(string key)
        {
            foreach (DictionaryEntry entry in ServerCacheStore)
            {
                if (entry.Key.ToString().Contains(key))
                {
                    ServerCacheStore.Remove(entry.Key.ToString());
                }
            }
        }

        public void Clear()
        {
            foreach (DictionaryEntry entry in ServerCacheStore)
            {
                ServerCacheStore.Remove(entry.Key.ToString());
            }
        }        
    }
}
